import socket

client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

hostname = socket.gethostname()
port = 4004

client_socket.connect((hostname, port))
message = client_socket.recv(1024)
client_socket.close()

print(message.decode('ascii'))
