set -e

echo "Deployment started ..."

# Pull the latest version of the app
git pull origin master --rebase
echo "New changes copied to server !"

# echo "Installing Dependencies..."
# npm install --yes

# echo "Deployment Finished!"
