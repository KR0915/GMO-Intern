#!/bin/bash

echo "Executing Flask initialization for plan: $1"

# Update the package list and install necessary packages in non-interactive mode
export DEBIAN_FRONTEND=noninteractive
sudo apt-get update -y
sudo apt-get install -y python3 python3-pip python3-venv

# Create a directory for the Flask application
sudo mkdir -p /opt/flask_app
sudo chown -R $USER:$USER /opt/flask_app

# Create a Python virtual environment
python3 -m venv /opt/flask_app/venv

# Activate the virtual environment and install Flask
source /opt/flask_app/venv/bin/activate
pip install Flask

# Create a simple Flask application
cat <<EOF > /opt/flask_app/app.py
from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello():
    return "Hello, World!"

if __name__ == '__main__':
    app.run(host='0.0.0.0')
EOF

# Create a systemd service file for the Flask application
cat <<EOF | sudo tee /etc/systemd/system/flask_app.service
[Unit]
Description=Flask Application
After=network.target

[Service]
User=$USER
WorkingDirectory=/opt/flask_app
ExecStart=/opt/flask_app/venv/bin/python /opt/flask_app/app.py
Restart=always

[Install]
WantedBy=multi-user.target
EOF

# Reload systemd to recognize the new service, enable it to start at boot, and start the service
sudo systemctl daemon-reload
sudo systemctl enable flask_app.service
sudo systemctl start flask_app.service

# Check if the Flask application is running and the port is open
sleep 5  # Wait for a few seconds to allow the server to start
if sudo lsof -iTCP:5000 -sTCP:LISTEN; then
  echo "Flask application is running and the port 5000 is open."
else
  echo "Flask application failed to start or the port 5000 is not open."
fi



