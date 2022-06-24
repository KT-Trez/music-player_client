export default function useTimestamp(time: number) {
	// ditch; use moment.js instead
	if (time >= 86400)
		throw Error('Time greater than day.');

	const doubleDigit = (number: number) => {
		if (number.toString().length === 1)
			return '0' + number;
		return number;
	};

	// todo: automate calculations
	const days = Math.floor(time / (60 * 60 * 24));
	const hours = Math.floor((time - days * 24) / (60 * 60));
	const minutes = Math.floor((time - hours * 60) / 60);
	const seconds = time - minutes * 60;

	return (days > 0 ? doubleDigit(days) + ':' : '') + (hours > 0 ? doubleDigit(hours) + ':' : '') + doubleDigit(minutes) + ':' + doubleDigit(seconds);
}