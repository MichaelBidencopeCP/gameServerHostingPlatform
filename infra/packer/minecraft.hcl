
packer{
    required_plugins {
        amazon = {
            version = ">= 1.0.0"
            source  = "hashicorp/amazon"
        }
    }
}

source "amazon-ebs" "" {

}