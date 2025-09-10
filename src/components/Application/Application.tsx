import { FC, useState, useEffect, forwardRef } from 'react';
import { NavLink } from 'react-router-dom';

import { Footer } from '../Footer/Footer';

import dron3 from '@/assets/images/dron-3.png';

import './application.pcss';

interface ApplicationProps {
	sectionIds: string[];
	scrollToSection: (id: string) => void;
}

interface UserData {
	fio: string;
	mail: string;
	num: string;
	org: string;
}

interface FormData {
	name: keyof UserData;
	text: string;
	ph: string;
}

const formData: FormData[] = [
	{
		name: 'fio',
		text: 'ФИО',
		ph: 'Ваше ФИО',
	},
	{
		name: 'mail',
		text: 'Email',
		ph: 'example@example.com',
	},
	{
		name: 'num',
		text: 'Телефон',
		ph: '+7 (999) 999-99-99',
	},
	{
		name: 'org',
		text: 'Название вашей организации',
		ph: 'Организация',
	},
];

export const Application = forwardRef<HTMLElement, ApplicationProps>(
	({ sectionIds, scrollToSection }, ref) => {
		const [userData, setUserData] = useState<UserData>({
			fio: '',
			mail: '',
			num: '',
			org: '',
		});
		const [btnText, setBtnText] = useState<string>('ОТПРАВИТЬ');
		const [submitted, setSubmitted] = useState<boolean>(false);
		const [submitting, setSubmitting] = useState<boolean>(false);

		useEffect(() => {
			if (submitted) {
				// очищаем форму только один раз, после отправки
				setUserData({ fio: '', mail: '', num: '', org: '' });
			}
		}, [submitted]);

		const handleFormBtn = async (e: React.FormEvent) => {
			e.preventDefault();
			if (submitted || submitting) return; // запрет повторной отправки

			const { fio, mail, num, org } = userData;
		
			if ([fio, mail, num, org].some(field => field.trim() === '')) return;
			
			setSubmitting(true);

			try {
				await fetch("https://docs.google.com/forms/d/e/1FAIpQLScb89d773ZJYqZCQ_O09E5LVhL9p_2fi_xRyJPTc4WrNYOWRA/formResponse", {
					method: "POST",
					mode: "no-cors",
					headers: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					body: new URLSearchParams({
						"entry.755999436": fio,
						"entry.1839799665": mail,
						"entry.1488955589": num,
						"entry.731529027": org
					}).toString()
				});
		
				setBtnText("ВАША ЗАЯВКА ОТПРАВЛЕНА");
				setSubmitted(true); // блокируем повторную отправку
			} catch (err) {
				console.error("Ошибка при отправке", err);
				setBtnText('ОШИБКА ПРИ ОТПРАВКЕ');
			} finally {
				setSubmitting(false);
			}
		};


		/*const handleFormBtn = (): void => {
			const { fio, mail, num, org } = userData;
			if ([fio, mail, num, org].every(field => field.trim() !== '')) {
				setBtnText('ВАША ЗАЯВКА ОТПРАВЛЕНА');
			} else {
				return;
			}

			const formBtn: HTMLButtonElement | null = document.querySelector(
				'.application-form-btn'
			);
			const formInput: NodeListOf<HTMLInputElement> = document.querySelectorAll(
				'.application-form-input'
			);

			if (formBtn && formInput) {
				formBtn.disabled = true;
				for (let i = 0; i <= formInput.length - 1; i++) {
					formInput[i].disabled = true;
				}
				formBtn.style.cursor = 'default';
			}
		};*/

		return (
			<div className={'application-wrapper'}>
				<section className={'application section'} ref={ref}>
					<div className={'container'}>
						<div className={'application-inner'}>
							<div className={'application-container'}>
								<div className={'application-descr'}>
									<h2 className={'application-title'}>
										ЗАЯВКА НА ПРИОБРЕТЕНИЕ ЛИЦЕНЗИИ
									</h2>
									<p className={'application-text'}>
										Заполните небольшую форму, мы свяжемся с вами по указанным
										контактным данным и обсудим лучшие варианты приобретения
										симулятора «НЕБО-ЗЕМЛЯ»
									</p>
								</div>
								<img className={'application-img'} src={dron3} alt={'Дрон'} />
							</div>
							<form className={'application-form'}>
								{formData.map(item => (
									<div className={'application-form-group'} key={item.text}>
										<label className={'application-form-title'}>
											{item.text}
										</label>
										<input
											type={'text'}
											className={'application-form-input'}
											placeholder={item.ph}
											value={userData[item.name] || ''}
											onChange={e => {
												setUserData(prev => ({
													...prev,
													[item.name]: e.target.value,
												}));
											}}
											required
										/>
									</div>
								))}
								<button
									className={'application-form-group application-form-btn'}
									onClick={handleFormBtn}
									type="submit"
								>
									{btnText}
								</button>
								<p className={'application-form-group application-form-policy'}>
									Отправляя заявку вы соглашаетесь с
									<NavLink
										to={'/'}
										className="application-form-policy-link"
										rel={'noopener noreferrer'}
									>
										политикой конфиденциальности
									</NavLink>
								</p>
							</form>
						</div>
					</div>
				</section>
				<Footer sectionIds={sectionIds} onScroll={scrollToSection} />
			</div>
		);
	}
);

Application.displayName = 'Application';
