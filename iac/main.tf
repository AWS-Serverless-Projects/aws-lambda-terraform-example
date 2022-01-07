# Lambda module for displaying a GIF
module "lambda_for_gifs" {
  source = "./lambda"
  function_name = "lambda-display-gif"
  lambda_role = "lambda-for-gif-role"
  lambda_policy = "lambda-for-gif-policy"
  environment = "dev"
  region = var.region
  accountId = var.accountId
}