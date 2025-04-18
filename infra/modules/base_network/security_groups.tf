
resource "aws_security_group" "mine_server_sg" {
    name = "mine_server_sg"
    description = "Security group for Minecraft server"
    vpc_id = aws_vpc.main.id
    tags = {
      game = "minecraft"
    }
  
}

resource "aws_security_group_rule" "managment_portal" {
    type = "ingress"
    protocol = "tcp"
    from_port = 23333
    to_port = 23333
    security_group_id = aws_security_group.mine_server_sg.id
    cidr_blocks = ["0.0.0.0/0"]
}
resource "aws_security_group_rule" "managment_portal_two" {
    type = "ingress"
    protocol = "tcp"
    from_port = 24444
    to_port = 24444
    security_group_id = aws_security_group.mine_server_sg.id
    cidr_blocks = ["0.0.0.0/0"]
}

resource "aws_security_group_rule" "minecraft" {
    type = "ingress"
    protocol = "tcp"
    from_port = 25565
    to_port = 25565
    security_group_id = aws_security_group.mine_server_sg.id
    cidr_blocks = ["0.0.0.0/0"]
}

