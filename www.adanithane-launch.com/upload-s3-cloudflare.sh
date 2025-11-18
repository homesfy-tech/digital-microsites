#!/bin/bash

# AWS S3 Upload Script for Cloudflare + GoDaddy Setup
# Configure these variables for your setup

BUCKET_NAME="your-s3-bucket-name"
REGION="us-east-1"  # Use us-east-1 for better Cloudflare integration
PROFILE="default"   # Change to your AWS profile if needed

echo "🚀 Uploading to S3 with Cloudflare-optimized cache headers..."

# Upload HTML files with no cache (for immediate updates)
echo "📄 Uploading HTML files (no cache)..."
aws s3 sync . s3://$BUCKET_NAME \
  --exclude "*" \
  --include "*.html" \
  --cache-control "no-cache, no-store, must-revalidate" \
  --content-type "text/html; charset=utf-8" \
  --region $REGION \
  --profile $PROFILE

# Upload CSS files with 1-year cache
echo "🎨 Uploading CSS files (1-year cache)..."
aws s3 sync . s3://$BUCKET_NAME \
  --exclude "*" \
  --include "*.css" \
  --cache-control "public, max-age=31536000, immutable" \
  --content-type "text/css" \
  --region $REGION \
  --profile $PROFILE

# Upload JS files with 1-year cache
echo "⚡ Uploading JavaScript files (1-year cache)..."
aws s3 sync . s3://$BUCKET_NAME \
  --exclude "*" \
  --include "*.js" \
  --cache-control "public, max-age=31536000, immutable" \
  --content-type "application/javascript" \
  --region $REGION \
  --profile $PROFILE

# Upload WebP images with 1-year cache
echo "🖼️ Uploading WebP images (1-year cache)..."
aws s3 sync . s3://$BUCKET_NAME \
  --exclude "*" \
  --include "*.webp" \
  --cache-control "public, max-age=31536000, immutable" \
  --content-type "image/webp" \
  --region $REGION \
  --profile $PROFILE

# Upload other image formats with 1-year cache
echo "🖼️ Uploading other images (1-year cache)..."
aws s3 sync . s3://$BUCKET_NAME \
  --exclude "*" \
  --include "*.jpg" \
  --include "*.jpeg" \
  --include "*.png" \
  --include "*.svg" \
  --include "*.gif" \
  --cache-control "public, max-age=31536000, immutable" \
  --region $REGION \
  --profile $PROFILE

# Upload font files with 1-year cache
echo "🔤 Uploading font files (1-year cache)..."
aws s3 sync . s3://$BUCKET_NAME \
  --exclude "*" \
  --include "*.woff" \
  --include "*.woff2" \
  --include "*.ttf" \
  --include "*.eot" \
  --cache-control "public, max-age=31536000, immutable" \
  --region $REGION \
  --profile $PROFILE

# Upload assets folder with 1-year cache
echo "📁 Uploading assets folder (1-year cache)..."
aws s3 sync ./assests s3://$BUCKET_NAME/assests \
  --cache-control "public, max-age=31536000, immutable" \
  --region $REGION \
  --profile $PROFILE

# Upload CSS folder with 1-year cache
echo "📁 Uploading CSS folder (1-year cache)..."
aws s3 sync ./css s3://$BUCKET_NAME/css \
  --cache-control "public, max-age=31536000, immutable" \
  --region $REGION \
  --profile $PROFILE

# Upload JS folder with 1-year cache
echo "📁 Uploading JS folder (1-year cache)..."
aws s3 sync ./js s3://$BUCKET_NAME/js \
  --cache-control "public, max-age=31536000, immutable" \
  --region $REGION \
  --profile $PROFILE

# Upload fonts folder with 1-year cache
echo "📁 Uploading fonts folder (1-year cache)..."
aws s3 sync ./fonts s3://$BUCKET_NAME/fonts \
  --cache-control "public, max-age=31536000, immutable" \
  --region $REGION \
  --profile $PROFILE

# Upload img folder with 1-year cache
echo "📁 Uploading img folder (1-year cache)..."
aws s3 sync ./img s3://$BUCKET_NAME/img \
  --cache-control "public, max-age=31536000, immutable" \
  --region $REGION \
  --profile $PROFILE

# Set bucket policy for public read access
echo "🔒 Setting bucket policy for public read access..."
cat > bucket-policy.json << EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::$BUCKET_NAME/*"
    }
  ]
}
EOF

aws s3api put-bucket-policy --bucket $BUCKET_NAME --policy file://bucket-policy.json --profile $PROFILE
rm bucket-policy.json

echo "✅ Upload completed with Cloudflare-optimized cache headers!"
echo ""
echo "📋 Next steps for Cloudflare setup:"
echo "1. Add your domain to Cloudflare"
echo "2. Update DNS records in GoDaddy to point to Cloudflare nameservers"
echo "3. Configure Cloudflare cache rules using the cloudflare-cache-rules.json file"
echo "4. Enable Cloudflare features:"
echo "   - Auto Minify (CSS, JS, HTML)"
echo "   - Brotli compression"
echo "   - HTTP/2"
echo "   - HTTP/3 (QUIC)"
echo ""
echo "🔧 Remember to update these variables in the script:"
echo "   - BUCKET_NAME: $BUCKET_NAME"
echo "   - REGION: $REGION"
echo "   - PROFILE: $PROFILE"
