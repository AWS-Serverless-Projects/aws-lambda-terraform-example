data "archive_file" "lambda_zip" {
  type          = "zip"
  source_file   = "lambda/function_src/index.js"
  output_path   = "lambda/function_src/index.zip"
}

resource "aws_lambda_function" "main" {
  filename  = data.archive_file.lambda_zip.output_path
  function_name = var.function_name
  role = aws_iam_role.iam_for_lambda.arn
  handler = var.handler
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256
  runtime = var.runtime
}

resource "aws_lambda_permission" "apigw_lambda" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.main.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "arn:aws:execute-api:${var.region}:${var.accountId}:${aws_api_gateway_rest_api.api.id}/*/${aws_api_gateway_method.method.http_method}${aws_api_gateway_resource.resource.path}"
}