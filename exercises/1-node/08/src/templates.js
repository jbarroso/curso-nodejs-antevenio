const form = () =>
  `<html>
  <body>
  <form action = "/confirm" method="POST">
  <label for="url">URL<label>
  <input name="url">
  <input type="submit" value="Send"/>
  </form>
  </body>
  </html>`;

const confirm = (url) =>
  `<html>
  <body>
  Thanks! your url is
  <a href="${url}">${url}</a>
  </body>
  </html>`;

module.exports = { form, confirm };
