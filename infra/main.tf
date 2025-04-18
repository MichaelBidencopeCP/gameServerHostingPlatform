terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"  // Use appropriate version
    }
  }
}

# East region provider
provider "aws" {
  alias  = "us-east-2"
  region = "us-east-2"
}

# West region provider
provider "aws" {
  alias  = "us-west-2"
  region = "us-west-2"
}


module "base_network_us_east_2" {
    source = "./modules/base_network"
    cidr_block = "10.0.0.0/16"

    providers = {
      aws = aws.us-east-2
    }
}

module "base_network_us_west_2" {
    source = "./modules/base_network"
    cidr_block = "10.1.0.0/16"

    providers = {
        aws = aws.us-west-2
    }
  
}
