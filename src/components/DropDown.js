import React, { useEffect } from 'react';
import styles from '../components/DropDown.module.css';

const DropDown = () => {
  useEffect(() => {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
      const select = dropdown.querySelector('.select');
      const caret = dropdown.querySelector('.caret');
      const menu = dropdown.querySelector('.menu');
      const options = dropdown.querySelectorAll('.menu li');
      const selected = dropdown.querySelector('.selected');

      select.addEventListener('click', () => {
        select.classList.toggle('select-clicked');
        caret.classList.toggle('carot-rotate');
        menu.classList.toggle('menu-open');
      });

      options.forEach(option => {
        option.addEventListener('click', () => {
          selected.innerText = option.innerText;
          select.classList.remove('select-clicked');
          caret.classList.remove('carot-rotate');
          menu.classList.remove('menu-open');

          options.forEach(otherOption => {
            otherOption.classList.remove('active');
          });

          option.classList.add('active');
        });
      });
    });
  }, []);

  return (
    <div className={styles.dropdown}>
      <div className={styles.select}>
        <span className={styles.selected}>1. 목차1</span>
        <div className={styles.caret}></div>
      </div>
      <ul className={styles.menu}>
        <li>2. 목차2</li>
        <li>3. 목차3</li>
        <li>4. 목차4</li>
        <li className={styles.active}>1. 목차1</li>
        <li>5. 목차5</li>
      </ul>
    </div>
  );
};

export default DropDown;
