# Use a lightweight Alpine Linux image
FROM alpine:latest

# Install SQLite and socat
RUN apk add --no-cache sqlite socat

# Set the working directory
WORKDIR /data

# Copy the init.sql file into the container
COPY init.sql .

# Run socat to listen on port 5432 and pipe data to SQLite
CMD ["socat", "-u", "tcp-listen:5432,reuseaddr,fork", "exec:sqlite3 -init /data/init.sql /data/customers.db"]
