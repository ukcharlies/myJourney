#!/bin/bash

# funnction to create foldersin each supplied directory 

#!/bin/bash

# Function to create folders in each directory supplied
create_folders() {
  # Define the folder names to create
  folders=("tutorials" "projects" "note")

  # Loop over each directory supplied as an argument
  for dir in "$@"; do
    # Create each folder in the directory
    for folder in "${folders[@]}"; do
      # Create the folder if it doesn't already exist
      if [ ! -d "$dir/$folder" ]; then
        mkdir -p "$dir/$folder"
        echo "Created folder: $dir/$folder"
      else
        echo "Folder already exists: $dir/$folder"
      fi
    done
  done
}

# Call the function with all arguments passed to the script
create_folders "$@"
