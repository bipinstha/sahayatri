#!/bin/bash

##############################################################################
# Sahayatri Build Script
# 
# Usage: ./build.sh [local|remote]
#   - local:  Start development servers (UI + Lambda service locally)
#   - remote: Deploy to AWS (S3, Lambda, Terraform)
#
# Author: Sahayatri Development Team
# Date: 2026
##############################################################################

set -e

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Project root directory
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Log functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if parameter is provided
if [ -z "$1" ]; then
    log_error "No build target specified"
    echo ""
    echo "Usage: ./build.sh [local|remote]"
    echo ""
    echo "Targets:"
    echo "  local   - Build and run locally (dev servers)"
    echo "  remote  - Build and deploy to AWS"
    echo ""
    exit 1
fi

BUILD_TARGET="$1"

# Validate build target
if [[ "$BUILD_TARGET" != "local" && "$BUILD_TARGET" != "remote" ]]; then
    log_error "Invalid build target: $BUILD_TARGET"
    echo "Valid targets: local, remote"
    exit 1
fi

##############################################################################
# BUILD FUNCTIONS
##############################################################################

build_local() {
    log_info "Starting LOCAL build..."
    echo ""

    # Check prerequisites
    log_info "Checking prerequisites..."
    
    if ! command -v node &> /dev/null; then
        log_error "Node.js is not installed. Please install Node.js 14+ first."
        exit 1
    fi

    if ! command -v npm &> /dev/null; then
        log_error "npm is not installed. Please install npm first."
        exit 1
    fi

    log_success "Node.js $(node -v) and npm $(npm -v) found"
    echo ""

    # Install dependencies
    log_info "Installing dependencies..."
    
    # Lambda service dependencies
    log_info "Installing lambda-service dependencies..."
    cd "$PROJECT_ROOT/lambda-service"
    npm install
    log_success "lambda-service dependencies installed"
    echo ""

    # Return to project root
    cd "$PROJECT_ROOT"

    # Start servers
    log_info "Starting development servers..."
    echo ""

    # Start UI server in background
    log_info "Starting UI development server on http://localhost:5500"
    cd "$PROJECT_ROOT/ui"
    python3 -m http.server 5500 > /tmp/ui-server.log 2>&1 &
    UI_PID=$!
    log_success "UI Server started (PID: $UI_PID)"
    sleep 2
    echo ""

    # Return to project root
    cd "$PROJECT_ROOT"

    # Start Lambda service locally in background
    log_info "Starting Lambda service (local test mode)"
    cd "$PROJECT_ROOT/lambda-service"
    npm start > /tmp/lambda-server.log 2>&1 &
    LAMBDA_PID=$!
    log_success "Lambda Server started (PID: $LAMBDA_PID)"
    sleep 2
    echo ""

    # Return to project root
    cd "$PROJECT_ROOT"

    # Cleanup function - called on exit
    cleanup() {
        echo ""
        log_warning "Shutting down servers..."
        
        # Kill UI server
        if kill -0 $UI_PID 2>/dev/null; then
            kill $UI_PID 2>/dev/null
            log_info "Killed UI Server (PID: $UI_PID)"
        fi
        
        # Kill Lambda server
        if kill -0 $LAMBDA_PID 2>/dev/null; then
            kill $LAMBDA_PID 2>/dev/null
            log_info "Killed Lambda Server (PID: $LAMBDA_PID)"
        fi
        
        # Force kill on ports if needed
        sleep 1
        lsof -i :5500 -t 2>/dev/null | xargs -r kill -9 2>/dev/null
        lsof -i :3000 -t 2>/dev/null | xargs -r kill -9 2>/dev/null
        
        log_success "All servers stopped and ports freed"
        echo ""
    }

    # Set up trap to call cleanup on Ctrl+C
    trap cleanup SIGINT

    # Summary
    echo -e "${GREEN}========================================${NC}"
    log_success "LOCAL BUILD COMPLETE"
    echo -e "${GREEN}========================================${NC}"
    echo ""
    echo "Servers running:"
    echo "  • UI Application:        http://localhost:5500"
    echo "  • Lambda Service:        http://localhost:3000 (if configured)"
    echo ""
    echo "Access logs:"
    echo "  • UI logs:               tail -f /tmp/ui-server.log"
    echo "  • Lambda logs:           tail -f /tmp/lambda-server.log"
    echo ""
    echo "Press Ctrl+C to stop all servers and free ports"
    echo ""
    echo -e "${GREEN}========================================${NC}"
    echo ""

    # Show real-time logs from both servers
    log_info "Streaming logs (Ctrl+C to stop)..."
    echo ""
    
    # Create named pipes for log streaming
    mkfifo /tmp/logs.combined 2>/dev/null || true
    
    # Function to merge logs with prefixes
    (
        while IFS= read -r line; do
            echo "[UI] $line"
        done < <(tail -f /tmp/ui-server.log)
    ) &
    UI_TAIL_PID=$!
    
    (
        while IFS= read -r line; do
            echo "[LAMBDA] $line"
        done < <(tail -f /tmp/lambda-server.log)
    ) &
    LAMBDA_TAIL_PID=$!

    # Wait for servers or interrupt
    wait $UI_PID $LAMBDA_PID 2>/dev/null
    
    # Cleanup on completion
    cleanup
}

build_remote() {
    log_info "Starting REMOTE build and deployment..."
    echo ""

    # Check prerequisites
    log_info "Checking prerequisites..."

    if ! command -v aws &> /dev/null; then
        log_error "AWS CLI is not installed. Please install AWS CLI first."
        exit 1
    fi

    if ! command -v terraform &> /dev/null; then
        log_error "Terraform is not installed. Please install Terraform first."
        exit 1
    fi

    if ! command -v node &> /dev/null; then
        log_error "Node.js is not installed. Please install Node.js 14+ first."
        exit 1
    fi

    log_success "All prerequisites found"
    echo ""

    # Check AWS credentials
    log_info "Checking AWS credentials..."
    if ! aws sts get-caller-identity &> /dev/null; then
        log_error "AWS credentials not configured or invalid"
        echo "Please configure AWS credentials:"
        echo "  aws configure"
        exit 1
    fi
    
    AWS_ACCOUNT=$(aws sts get-caller-identity --query Account --output text)
    AWS_REGION=$(aws configure get region)
    log_success "AWS Account: $AWS_ACCOUNT (Region: $AWS_REGION)"
    echo ""

    # Install Lambda dependencies
    log_info "Installing lambda-service dependencies..."
    cd "$PROJECT_ROOT/lambda-service"
    npm install
    log_success "lambda-service dependencies installed"
    echo ""

    cd "$PROJECT_ROOT"

    # Initialize Terraform
    log_info "Initializing Terraform..."
    cd "$PROJECT_ROOT/terraform"
    terraform init
    log_success "Terraform initialized"
    echo ""

    # Plan Terraform changes
    log_info "Planning Terraform changes..."
    terraform plan -out=tfplan
    echo ""

    # Confirm deployment
    read -p "Do you want to proceed with Terraform deployment? (yes/no): " CONFIRM
    if [[ "$CONFIRM" != "yes" ]]; then
        log_warning "Deployment cancelled by user"
        exit 0
    fi
    echo ""

    # Apply Terraform changes
    log_info "Applying Terraform changes..."
    terraform apply tfplan
    log_success "Terraform deployment complete"
    echo ""

    # Get info from Terraform
    log_info "Fetching deployment info from Terraform..."
    cd "$PROJECT_ROOT/terraform"
    LAMBDA_FUNCTION=$(terraform output -raw lambda_function_name 2>/dev/null || echo "sahayatri-api-handler")
    DEPLOY_REGION=$(terraform output -raw aws_region 2>/dev/null || echo "ap-south-1")
    CLOUDFRONT_DIST=$(terraform output -raw cloudfront_distribution_id 2>/dev/null || echo "")
    cd "$PROJECT_ROOT"

    # Deploy UI to S3
    log_info "Deploying UI to S3..."
    S3_BUCKET="sahayatri-web-frontend-sahayatri-prod"
    
    if aws s3 ls "s3://$S3_BUCKET" --region "$DEPLOY_REGION" &> /dev/null; then
        aws s3 sync ui/ "s3://$S3_BUCKET/" --delete --cache-control "max-age=3600" --region "$DEPLOY_REGION"
        log_success "UI deployed to S3: s3://$S3_BUCKET/"
    else
        log_error "S3 bucket not found: s3://$S3_BUCKET/ in region $DEPLOY_REGION"
        log_warning "Make sure Terraform has created the S3 bucket first"
        exit 1
    fi
    echo ""

    # Deploy Lambda function
    log_info "Packaging and deploying Lambda function..."
    cd "$PROJECT_ROOT/lambda-service"
    
    # Create deployment package
    # We MUST include node_modules for the Lambda to work, but we exclude data and test files
    zip -r lambda-deployment.zip . \
        -x "data/*" "test-local.js" "server-local.js" "*.git*" ".DS_Store" > /dev/null
    
    # Update Lambda function code
    aws lambda update-function-code \
        --function-name "$LAMBDA_FUNCTION" \
        --zip-file fileb://lambda-deployment.zip \
        --region "$DEPLOY_REGION"
    
    log_success "Lambda function deployed: $LAMBDA_FUNCTION in $DEPLOY_REGION"
    
    # Clean up
    rm lambda-deployment.zip
    cd "$PROJECT_ROOT"
    echo ""

    # CloudFront invalidation
    if [ -n "$CLOUDFRONT_DIST" ]; then
        log_info "Invalidating CloudFront cache..."
        aws cloudfront create-invalidation \
            --distribution-id "$CLOUDFRONT_DIST" \
            --paths "/*" \
            --region "$DEPLOY_REGION"
        log_success "CloudFront cache invalidated"
    fi
    echo ""

    # Summary
    echo -e "${GREEN}========================================${NC}"
    log_success "REMOTE DEPLOYMENT COMPLETE"
    echo -e "${GREEN}========================================${NC}"
    echo ""
    echo "Deployed resources:"
    echo "  • UI:                    s3://$S3_BUCKET/"
    echo "  • Lambda Function:       $LAMBDA_FUNCTION"
    echo "  • AWS Region:            $AWS_REGION"
    echo ""
    echo "Next steps:"
    echo "  1. Verify deployment at your CloudFront domain"
    echo "  2. Check CloudWatch logs: aws logs tail /aws/lambda/$LAMBDA_FUNCTION --follow"
    echo "  3. Monitor with: aws cloudwatch get-metric-statistics ..."
    echo ""
}

##############################################################################
# MAIN EXECUTION
##############################################################################

log_info "Sahayatri Build Tool"
log_info "Build Target: $BUILD_TARGET"
log_info "Project Root: $PROJECT_ROOT"
echo ""

case "$BUILD_TARGET" in
    local)
        build_local
        ;;
    remote)
        build_remote
        ;;
esac
