#!/usr/bin/env python3
import os
import re

def extract_networks_from_data():
    """Extract all network data from snippets/data.mdx"""
    with open('snippets/data.mdx', 'r') as f:
        content = f.read()
    
    networks = {}
    
    # Find all network objects with id and title
    network_pattern = r'\{\s*id:\s*["\']([^"\']+)["\'],\s*title:\s*["\']([^"\']+)["\']'
    matches = re.findall(network_pattern, content)
    
    # Group by category based on position in file
    current_category = None
    category_pattern = r'id:\s*["\']([^"\']+)["\'],\s*label:'
    
    lines = content.split('\n')
    current_category = None
    
    for line in lines:
        # Check if this line defines a category
        cat_match = re.search(category_pattern, line)
        if cat_match:
            current_category = cat_match.group(1)
            if current_category not in networks:
                networks[current_category] = []
        
        # Check if this line has a network id and title
        net_match = re.search(network_pattern, line)
        if net_match and current_category:
            network_id, title = net_match.groups()
            networks[current_category].append({
                'id': network_id,
                'title': title
            })
    
    return networks

def create_network_page(network_id, title, category):
    """Create an empty network page with frontmatter"""
    # Use the network_id as filename (it's already properly formatted)
    filename = network_id
    
    # Create description based on title and category
    description = f"{title} data indexing and API access"
    
    filepath = f"en/supported-networks/{filename}.mdx"
    
    # Create directory if it doesn't exist
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    
    # Check if file already exists
    if os.path.exists(filepath):
        print(f"Skipping {filepath} - already exists")
        return
    
    content = f'''---
title: "{title}"
description: "{description}"
---'''
    
    with open(filepath, 'w') as f:
        f.write(content)
    
    print(f"Created {filepath}")

def main():
    # Change to the project directory
    os.chdir('/Users/account/sqd-docs-mintlify')
    
    # Extract networks data
    networks = extract_networks_from_data()
    
    print(f"Debug: Found {len(networks)} categories")
    for cat, items in networks.items():
        print(f"Debug: Category {cat} has {len(items)} items")
    
    total_created = 0
    for category, network_list in networks.items():
        print(f"\nCreating {category.upper()} networks:")
        for network in network_list:
            create_network_page(network['id'], network['title'], category)
            total_created += 1
    
    print(f"\nTotal network pages processed: {total_created}")

if __name__ == "__main__":
    main()
