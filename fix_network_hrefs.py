#!/usr/bin/env python3
import re
import os

def fix_network_hrefs():
    """Fix href values in data.mdx to match actual network file names"""
    
    with open('snippets/data.mdx', 'r') as f:
        content = f.read()
    
    # Find all network entries with id, title, and href
    pattern = r'(\{\s*id:\s*"([^"]+)",\s*title:\s*"([^"]+)"[^}]*?href:\s*")([^"]+)("[^}]*?\})'
    
    def replace_href(match):
        full_match = match.group(0)
        prefix = match.group(1)
        network_id = match.group(2)
        title = match.group(3)
        old_href = match.group(4)
        suffix = match.group(5)
        
        # Check if the file exists with the network_id
        expected_file = f"en/supported-networks/{network_id}.mdx"
        if os.path.exists(expected_file):
            new_href = f"/supported-networks/{network_id}"
            if old_href != new_href:
                print(f"Fixing: {title} -> {old_href} -> {new_href}")
                return prefix + new_href + suffix
        
        return full_match
    
    # Apply the replacements
    new_content = re.sub(pattern, replace_href, content, flags=re.DOTALL)
    
    # Write back the updated content
    with open('snippets/data.mdx', 'w') as f:
        f.write(new_content)
    
    print("Network href fixes completed!")

if __name__ == "__main__":
    os.chdir('/Users/account/sqd-docs-mintlify')
    fix_network_hrefs()
