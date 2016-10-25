pi = 1
i = 3
while i < 100000000:
	pi = pi - 1/i + 1/(i+2)
	#pi = pi-2/(i * (i + 2))
	i = i+4
	#if (i-3)%10000000 == 0:	
	print("pi= ", pi * 4, "i=", i-3)
