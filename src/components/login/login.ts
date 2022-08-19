import './login.scss';

export class Login {
  templateLogin() {
    return `
    <div class="close"></div>
    <h3 class="menu-heading">Войти</h3>
    <div class="menu__text">
      Войдите в свою учетную запись, используя адрес электронной почты и
      пароль, указанные при регистрации.
    </div>
    <form class="form">
      <label>
        <h5>Email</h5>
        <input type="email" name="email" required placeholder="Введите логин"/>
      </label>
      <label>
        <h5>Password</h5>
        <input type="text" name="password" minlength="8" maxlength="20" required placeholder="Введите пароль"/>
      </label>
      <button type="submit" class="sign__button btn btn-orange">Войти</button>
      <div class="signIn">
      У Вас нет аккаунта? <span>Зарегистрировать</span>
      </div>
    </form>
    `;
  }

  templateRegistration() {
    return `
    <div class="close"></div>
    <h3 class="menu-heading">Регистрация</h3>
    <div class="menu__text">
      Регистрация занимает меньше минуты, но дает вам полный контроль над учебой.
    </div>
    <form class="form" action="">
      <label>
        <h5>Login</h5>
        <input type="text" name="login" required placeholder="Введите логин"/>
      </label>
      <label>
        <h5>Password</h5>
        <input type="text" name="pass" minlength="8" maxlength="20" required placeholder="Введите пароль"/>
      </label>
      <label>
        <h5>Email</h5>
        <input type="email" name="email" required placeholder="Введите емейл"/>
      </label>
      <button type="submit" class="registration__button btn btn-orange">Регистрация</button>
      <div class="registration">
      У вас уже есть аккаунт? <span>Войти</span>
      </div>
    </а>
    </form>
    `;
  }
}
