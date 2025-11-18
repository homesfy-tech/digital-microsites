#!/bin/bash

# AWS S3 Upload Script with Cache Headers
# Make sure to set your bucket name and region

BUCKET_NAME="your-bucket-name"
REGION="us-east-1"
PROFILE="default"  # Change to your AWS profile if needed

echo "Uploading files to S3 with optimized cache headers..."

# Upload HTML files with short cache (for immediate updates)
echo "Uploading HTML files..."
aws s3 sync . s3://$BUCKET_NAME \
  --exclude "*" \
  --include "*.html" \
  --cache-control "public, max-age=0, must-revalidate" \
  --content-type "text/html" \
  --region $REGION \
  --profile $PROFILE

# Upload CSS files with long cache
echo "Uploading CSS files..."
aws s3 sync . s3://$BUCKET_NAME \
  --exclude "*" \
  --include "*.css" \
  --cache-control "public, max-age=31536000, immutable" \
  --content-type "text/css" \
  --region $REGION \
  --profile $PROFILE

# Upload JS files with long cache
echo "Uploading JavaScript files..."
aws s3 sync . s3://$BUCKET_NAME \
  --exclude "*" \
  --include "*.js" \
  --cache-control "public, max-age=31536000, immutable" \
  --content-type "application/javascript" \
  --region $REGION \
  --profile $PROFILE

# Upload image files with long cache
echo "Uploading image files..."
aws s3 sync . s3://$BUCKET_NAME \
  --exclude "*" \
  --include "*.webp" \
  --include "*.jpg" \
  --include "*.jpeg" \
  --include "*.png" \
  --include "*.svg" \
  --include "*.gif" \
  --cache-control "public, max-age=31536000, immutable" \
  --region $REGION \
  --profile $PROFILE

# Upload font files with long cache
echo "Uploading font files..."
aws s3 sync . s3://$BUCKET_NAME \
  --exclude "*" \
  --include "*.woff" \
  --include "*.woff2" \
  --include "*.ttf" \
  --include "*.eot" \
  --cache-control "public, max-age=31536000, immutable" \
  --region $REGION \
  --profile $PROFILE

# Upload assets folder with long cache
echo "Uploading assets folder..."
aws s3 sync ./assests s3://$BUCKET_NAME/assests \
  --cache-control "public, max-age=31536000, immutable" \
  --region $REGION \
  --profile $PROFILE

# Upload CSS folder with long cache
echo "Uploading CSS folder..."
aws s3 sync ./css s3://$BUCKET_NAME/css \
  --cache-control "public, max-age=31536000, immutable" \
  --region $REGION \
  --profile $PROFILE

# Upload JS folder with long cache
echo "Uploading JS folder..."
aws s3 sync ./js s3://$BUCKET_NAME/js \
  --cache-control "public, max-age=31536000, immutable" \
  --region $REGION \
  --profile $PROFILE

# Upload fonts folder with long cache
echo "Uploading fonts folder..."
aws s3 sync ./fonts s3://$BUCKET_NAME/fonts \
  --cache-control "public, max-age=31536000, immutable" \
  --region $REGION \
  --profile $PROFILE

# Upload img folder with long cache
echo "Uploading img folder..."
aws s3 sync ./img s3://$BUCKET_NAME/img \
  --cache-control "public, max-age=31536000, immutable" \
  --region $REGION \
  --profile $PROFILE

echo "Upload completed with optimized cache headers!"
echo "Remember to:"
echo "1. Update BUCKET_NAME variable with your actual bucket name"
echo "2. Update REGION if needed"
echo "3. Update PROFILE if using a different AWS profile"
echo "4. Make the script executable: chmod +x upload-to-s3.sh"
