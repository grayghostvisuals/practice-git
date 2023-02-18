# importing required modules
import socket	
import datetime

# initializing socket
s = socket.socket()	
host = socket.gethostname()
port = 12345

# binding port and host
s.bind((host, port))

# waiting for a client to connect
s.listen(5)
		
while True:
# accept connection
c, addr = s.accept()	
print ('got connection from addr', addr)
date = datetime.datetime.now()
d = str(date)

# sending data type should be string and encode before sending
c.send(d.encode())	
c.close()
