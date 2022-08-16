import './login.scss';

export class Login {
  templateLogin() {
    return `
    <div class="close">X</div>
    <h3 class="menu-heading">Войти</h3>
    <div class="menu__text">
      Войдите в свою учетную запись, используя адрес электронной почты и
      пароль, указанные при регистрации.
    </div>
    <form class="form" action="">
      <label>
        <h5>Login</h5>
        <input type="text" name="login" />
      </label>
      <label>
        <h5>Password</h5>
        <input type="text" name="password" />
      </label>
      <button type="submit">Войти</button>
      <div class="signIn">
        У вас уже есть аккаунт? <span>Войти</span>
      </div>
    </form>
    `;
  }

  templateRegistration() {
    return `
    <div class="close">X</div>
    <h3 class="menu-heading">Регистрация</h3>
    <div class="menu__text">
      Регистрация занимает меньше минуты, но дает вам полный контроль над учебой.
    </div>
    <form class="form" action="">
      <label>
        <h5>Login</h5>
        <input type="text" name="login" />
      </label>
      <label>
        <h5>Password</h5>
        <input type="text" name="pass" />
      </label>
      <label>
        <h5>Email</h5>
        <input type="email" name="email" />
      </label>
      <button type="submit">Регистрация</button>
      <div class="registration">
        У Вас нет аккаунта? <span>Зарегистрировать</span>
      </div>
    </form>
    `;
  }
}
