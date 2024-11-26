#!/bin/bash

# Set project directories
BACKEND_DIR="/Users/tusharnagdive/Development/vsWorkspace/Projects/pcda" # Root directory for your Spring Boot project
FRONTEND_DIR="./pcda-react/pcda-ui" # Path to your React project
JAR_FILE="target/pcda-0.0.1.jar" # Spring Boot JAR file
PORT=8888 # Application port

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo "Stopping existing application if exists..."
PID=$(lsof -t -i:8888)
if [ -n "$PID" ]; then
  kill -9 $PID
  echo "Stopped application running on port 8888."
else
    echo "Already Stop! no need to close"
fi

echo -e "${GREEN}Starting the build and deploy process...${NC}"

# Step 1: Build the React application
echo -e "${YELLOW}Building React application...${NC}"
cd "$FRONTEND_DIR"
if npm install && npm run build; then
    echo -e "${GREEN}React application built successfully.${NC}"
else
    echo -e "${RED}Failed to build React application.${NC}"
    exit 1
fi

# Step 2: Copy React build files to Spring Boot static folder
echo -e "${YELLOW}Copying React build files to Spring Boot static directory...${NC}"
cd "$BACKEND_DIR"
STATIC_DIR="src/main/resources/static"
rm -rf "$STATIC_DIR" && mkdir -p "$STATIC_DIR"
cp -r "$FRONTEND_DIR/build/"* "$STATIC_DIR"
if [ $? -eq 0 ]; then
    echo -e "${GREEN}React build files copied successfully.${NC}"
else
    echo -e "${RED}Failed to copy React build files.${NC}"
    exit 1
fi

# Step 3: Build the Spring Boot JAR
echo -e "${YELLOW}Building Spring Boot application...${NC}"
if ./mvnw clean package -DskipTests; then
    echo -e "${GREEN}Spring Boot application built successfully.${NC}"
else
    echo -e "${RED}Failed to build Spring Boot application.${NC}"
    exit 1
fi

# Step 4: Kill any running instance of the application
echo -e "${YELLOW}Stopping any running application on port $PORT...${NC}"
PID=$(lsof -ti tcp:"$PORT")
if [ -n "$PID" ]; then
    kill -9 "$PID"
    echo -e "${GREEN}Stopped running application on port $PORT.${NC}"
else
    echo -e "${YELLOW}No running application found on port $PORT.${NC}"
fi

# Step 5: Run the JAR file
echo -e "${YELLOW}Starting the Spring Boot application...${NC}"
if java -jar "$JAR_FILE"; then
    echo -e "${GREEN}Application started successfully. Access it at http://localhost:$PORT${NC}"
else
    echo -e "${RED}Failed to start the application.${NC}"
    exit 1
fi
