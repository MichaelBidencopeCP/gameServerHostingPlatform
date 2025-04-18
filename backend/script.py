import json

from .models import ServiceSecurityGroup, Service



def create_security_groups():
    """
        Check if security groups exist in the database, if not create them
        :return: None
    """
    
    # Read terraform output file

    with open("") as f:
        data = f.read()
    # Parse the JSON data
    data = json.loads(data)
    # Get the security groups
