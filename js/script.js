// getting all the cards
const allCards = document.querySelectorAll(".cards-scroll .card");
const containerHeight = document.querySelector(".card-row").getBoundingClientRect().top + window.pageYOffset;
const headerHeight = 70;
const baseWidth = 60;
const cardsCount = allCards.length;

const cardsClickHandler = (index) => {
	let topScrollValue = self.innerHeight * index - headerHeight * index;
	topScrollValue = Math.max(0, topScrollValue);

	const element = allCards[index];
	const { marginTop } = window.getComputedStyle(element);

	if (index === cardsCount - 1) {
		topScrollValue = topScrollValue - parseInt(marginTop) + headerHeight * 2 + 10;
	}

	const finalOffset = topScrollValue + containerHeight;
	const duration = 800;
	const startingY = window.pageYOffset;
	const diff = finalOffset - startingY;
	let start = null;

	// start and end slowly effect
	const easeInOutQuad = (t) => {
		return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
	};

	const step = (timestamp) => {
		if (!start) start = timestamp;
		const time = timestamp - start;
		const percent = easeInOutQuad(Math.min(time / duration, 1));
		window.scrollTo(0, startingY + diff * percent);
		if (time < duration) {
			window.requestAnimationFrame(step);
		}
	};
	window.requestAnimationFrame(step);
};

if (cardsCount) {
	allCards.forEach((card, i) => {
		const incValue = i * headerHeight;
		const decValue = (cardsCount - i - 1) * headerHeight;
		const widthValue = (cardsCount - i) * baseWidth;
		const heightValue = cardsCount * headerHeight - headerHeight;

		const totalHeaders = cardsCount * headerHeight; // getting height of all cards
		const reduceValue = (cardsCount - i) * headerHeight;

		let bottomValue = self.innerHeight - totalHeaders - reduceValue + headerHeight;
		bottomValue = bottomValue > 0 ? "-" + bottomValue : Math.abs(bottomValue); // make minus and plus values

		const fontSize = 20 + 4 * i;
		card.style.fontSize = `${fontSize}px`;

		// we can optimize like this for
		card.style.marginTop = `${incValue}px`;
		card.style.marginBottom = `${decValue}px`;
		card.style.top = `${incValue}px`;
		card.style.bottom = `${bottomValue}px`;
		card.style.maxWidth = `calc(100% - ${widthValue}px)`;
		card.style.maxHeight = `calc(100vh - ${heightValue - 3}px)`;

		card.addEventListener("click", () => cardsClickHandler(i));
	});
}
