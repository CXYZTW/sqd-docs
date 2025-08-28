#!/usr/bin/env python3
import os
import re

def create_network_pages():
    """Create network pages by parsing data.mdx line by line"""
    
    # Read the data file
    with open('snippets/data.mdx', 'r') as f:
        lines = f.readlines()
    
    print(f"Read {len(lines)} lines from data.mdx")
    
    networks = []
    current_network = {}
    
    for i, line in enumerate(lines):
        line = line.strip()
        
        # Look for id lines
        if 'id:' in line and '"' in line:
            id_match = re.search(r'id:\s*"([^"]+)"', line)
            if id_match:
                if current_network:  # Save previous network
                    networks.append(current_network)
                current_network = {'id': id_match.group(1)}
                print(f"Found network ID: {id_match.group(1)} on line {i+1}")
        
        # Look for title lines
        elif 'title:' in line and '"' in line and current_network:
            title_match = re.search(r'title:\s*"([^"]+)"', line)
            if title_match:
                current_network['title'] = title_match.group(1)
                print(f"Found title: {title_match.group(1)} for {current_network.get('id', 'unknown')}")
    
    # Don't forget the last network
    if current_network:
        networks.append(current_network)
    
    print(f"\nParsed {len(networks)} networks")
    
    # Create pages
    created_count = 0
    for network in networks:
        if 'id' in network and 'title' in network:
            filename = f"en/supported-networks/{network['id']}.mdx"
            
            # Skip if already exists
            if os.path.exists(filename):
                print(f"Skipping {filename} - already exists")
                continue
            
            # Create the page
            content = f'''---
title: "{network['title']}"
description: "{network['title']} data indexing and API access"
---'''
            
            with open(filename, 'w') as f:
                f.write(content)
            
            print(f"Created {filename}")
            created_count += 1
    
    print(f"\nTotal pages created: {created_count}")
    print(f"Total networks found: {len(networks)}")

if __name__ == "__main__":
    os.chdir('/Users/account/sqd-docs-mintlify')
    create_network_pages()
