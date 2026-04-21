variable "aws_region" {
  description = "AWS region to deploy to"
  type        = string
  default     = "ap-south-1"
}

variable "project_suffix" {
  description = "Random suffix to ensure bucket name uniqueness"
  type        = string
  default     = "production"
}

variable "admin_key" {
  description = "Secret key for admin actions"
  type        = string
  default     = "sahayatri123"
}

variable "jwt_secret" {
  description = "Secret for JWT signing"
  type        = string
  default     = "sahayatri-secret-123"
}
