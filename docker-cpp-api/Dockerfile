FROM debian:bookworm

# Install compiler and curl
RUN apt-get update && apt-get install -y g++ curl

# Set working directory
WORKDIR /app

# Copy source files
COPY analysis.cpp .
COPY httplib.h .

# Create include directory and copy the header properly
RUN mkdir -p /app/nlohmann
COPY nlohmann/json.hpp /app/nlohmann/json.hpp

# Compile C++ server with correct include path
RUN g++ -o server analysis.cpp -I/app -pthread

# Expose port
EXPOSE 8000

# Start server
CMD ["./server"]
