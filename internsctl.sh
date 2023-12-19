#!/bin/bash

# Function to display CPU information
cpu_info() {
    lscpu
}

# Function to display memory information
memory_info() {
    free
}

# Function to create a new user
create_user() {
    if [ $# -eq 1 ]; then
        if id "$1" &>/dev/null; then
            echo "Error: User '$1' already exists."
        else
            useradd "$1" && passwd "$1"
            echo "User '$1' created successfully."
        fi
    else
        echo "Usage: internsctl user create <username>"
    fi
}

# Function to list users
list_users() {
    if [ "$1" == "--sudo-only" ]; then
        getent passwd | grep -E -v 'nologin$' | cut -d: -f1 | xargs groups | grep sudo | cut -d: -f1
    else
        getent passwd | grep -E -v 'nologin$' | cut -d: -f1
    fi
}

# Function to get file information
file_info() {
    if [ $# -eq 1 ]; then
        filename="$1"
        if [ -e "$filename" ]; then
            stat --printf="File: %n\nAccess: %A\nSize(B): %s\nOwner: %U\nModify: %y\n" "$filename"
        else
            echo "Error: File not found - $filename"
        fi
    else
        echo "Usage: internsctl file getinfo [options] <file-name>"
    fi
}

# Parse command line arguments
if [ "$#" -eq 0 ]; then
    echo "Usage: internsctl <command> [options]"
    exit 1
fi

case $1 in
    "cpu")
        case $2 in
            "getinfo")
                cpu_info
                ;;
            *)
                echo "Error: Invalid argument for CPU"
                ;;
        esac
        ;;
    "memory")
        case $2 in
            "getinfo")
                memory_info
                ;;
            *)
                echo "Error: Invalid argument for memory"
                ;;
        esac
        ;;
    "user")
        case $2 in
            "create")
                create_user "$3"
                ;;
            "list")
                list_users "$3"
                ;;
            *)
                echo "Error: Invalid argument for user"
                ;;
        esac
        ;;
    "file")
        case $2 in
            "getinfo")
                file_info "$3"
                ;;
            *)
                echo "Error: Invalid argument for file"
                ;;
        esac
        ;;
    "--version")
        echo "internsctl v0.1.0"
        ;;
    "--help")
        echo "Usage: internsctl <command> [options]"
        echo ""
        echo "Commands:"
        echo "  cpu getinfo               Display CPU information"
        echo "  memory getinfo            Display memory information"
        echo "  user create <username>    Create a new user"
        echo "  user list [--sudo-only]   List regular users (optionally, list only users with sudo permissions)"
        echo "  file getinfo [OPTIONS] <file-name>"
        echo "                           Get information about a file"
        echo ""
        echo "Options:"
        echo "  --version                 Display the command version"
        echo "  --help                    Display this help message"
        ;;
    *)
        echo "Error: Invalid command"
        ;;
esac
