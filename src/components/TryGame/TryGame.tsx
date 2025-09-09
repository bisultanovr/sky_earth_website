import { FC } from 'react';

import tryGameBg from '@/assets/images/try-game-bg.png';
import gamePreview from '@/assets/images/game-preview.jpg';
import gameBg from '@/assets/images/game-bg.png';

import './try-game.pcss';

export const TryGame: FC = () => {
	return (
		<section
			className={'game section'}
			style={{ backgroundImage: `url(${tryGameBg})` }}
		>
			<div
				className={'game-inner'}
				style={{ backgroundImage: `url(${gameBg})` }}
			>
				<img className={'game-img'} src={gamePreview} alt={''} />
				<p className={'game-descr'}>
					Попробуйте тестовую версию в удобном формате. Подавите БпЛА в
					облегченном формате.
				</p>
				<a
					className={'game-btn'}
					href={'https://drive.google.com/file/d/1ba0x_FTK7cW6QyzhQX13HFX1NykJoTVU/view?usp=sharing'}
					rel={'noreferrer noopener'}
					target={'_blank'}
				>
					ПОДАВИТЬ
				</a>
			</div>
		</section>
	);
};
