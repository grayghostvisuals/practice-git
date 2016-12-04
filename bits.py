		from collections import Counter

		test_cases = int(input())

		for i in range(test_cases):

			num = int(input())
			max_bits = 0

			while(num > 0):

				if int(Counter(bin(int(num)))['1']) > max_bits:
					max_bits = int(Counter(bin(int(num)))['1'])

				num  = num // 10

			print(max_bits)
