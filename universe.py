def hello_world(speaker = ""):
	## This is a method that speaks for humans!
	if speaker:
		speaker = "{}: ".format(speaker)
	print "{}Hello World!".format(speaker)

def alien_world(person):
	## This is a method that speaks for aliens!
	hello_world(person)
	print "Alien: We come in peace!"

person = input("Enter your name in quotes:")
alien_world(person)
