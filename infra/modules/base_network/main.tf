
# VPC
resource "aws_vpc" "main" {
  cidr_block           = var.cidr_block
  #enable_dns_hostnames = true
  #enable_dns_support   = true

  tags = {
    Name = "main-vpc"
  }
}
# Add later for production
# Public Subnet
#resource "aws_subnet" "public" {
#  vpc_id                  = aws_vpc.main.id
#  cidr_block              = var.cidr_block
#  map_public_ip_on_launch = true
#  availability_zone       = "${var.aws_region}a"
#
#  tags = {
#    Name = "public-subnet"
#  }
#}
#
## Private Subnet
#resource "aws_subnet" "private" {
#  vpc_id            = aws_vpc.main.id
#  cidr_block        = "10.0.2.0/24"
#  availability_zone = "${var.aws_region}a"
#
#  tags = {
#    Name = "private-subnet"
#  }
#}
#
## Internet Gateway
#resource "aws_internet_gateway" "igw" {
#  vpc_id = aws_vpc.main.id
#
#  tags = {
#    Name = "main-igw"
#  }
#}

## Route Table (for public subnet)
#resource "aws_route_table" "public" {
#  vpc_id = aws_vpc.main.id
#
#  route {
#    cidr_block = "0.0.0.0/0"
#    gateway_id = aws_internet_gateway.igw.id
#  }
#
#  tags = {
#    Name = "public-rt"
#  }
#}
#
## Route Table Association
#resource "aws_route_table_association" "public_assoc" {
#  subnet_id      = aws_subnet.public.id
#  route_table_id = aws_route_table.public.id
#}
