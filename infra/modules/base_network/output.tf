

output "vpc_id" {
    value = aws_vpc.main.id
}

output "security_groups_id"{
    value = [
        [aws_security_group.mine_server_sg.tags["game"],aws_security_group.mine_server_sg.id],
    ]
    description = "Security group name and id"
}