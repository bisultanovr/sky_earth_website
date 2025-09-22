import { forwardRef } from 'react';

import { Slider } from '../Slider/Slider';

import { Slide } from '@/interfaces/Slide';

import { trailerSlides } from '@/store/sliderData';

import locationsBg from '@/assets/images/locations-bg.png';

import './trailer.pcss';

interface Slider {
	slides: Slide[];
	sliderBg: string;
}

export const Trailer = forwardRef<HTMLElement, Slider>((_, ref) => {
	return (
		<section
			className={'trailer section'}
			style={{ backgroundImage: `url(${locationsBg})` }}
			ref={ref}
		>
			<div className={'container'}>
				<div className={'trailer-inner'}>
					<h2 className={'trailer-title'}>ТРЕЙЛЕР</h2>
					<Slider slides={trailerSlides} />
				</div>
			</div>
		</section>
	);
});

Slider.displayName = 'Trailer';
