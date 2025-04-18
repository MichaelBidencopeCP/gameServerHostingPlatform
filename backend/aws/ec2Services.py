import boto3
from dotenv import load_dotenv
import os

load_dotenv()
# Load environment variables
KEY_NAME = os.getenv('KEY_NAME')


def create_instance(region_name, instance_type, ami_id, security_group_ids, user_id):
    try:
        ec2 = boto3.resource('ec2', region_name=region_name)
        # Create a new EC2 instance
        instance = ec2.create_instances(
            InstanceType=instance_type,
            ImageId=ami_id,
            KeyName=KEY_NAME,
            SecurityGroupIds=security_group_ids,
            MinCount=1,
            MaxCount=1,
            TagSpecifications=[
                {
                    "ResourceType": "instance",
                    "Tags": [
                        {"Key": "Owner", "Value": user_id},
                        {"Key": "Game", "Value": "minecraft"},
                    ]
                }
            ]
        )
    
        return instance[0].id
    except Exception as e:
        print(f"Error creating instance: {e}")
        return None

def shutdown_instance(region_name, instance_id):
    client = boto3.client('ec2', region_name=region_name)

    response = client.stop_instances(
        InstanceIds=[instance_id]
    )
    return response

def terminate_instance(region_name, instance_id):
    client = boto3.client('ec2', region_name=region_name)

    response = client.terminate_instances(
        InstanceIds=[instance_id]
    )
    return response
    

  

