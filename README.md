[![@shieldy_bot](/design/banner.png?raw=true)](https://t.me/shieldy_bot)

# [@shieldy_bot](https://t.me/shieldy_bot) Telegram bot code

This is the code for the anti-spam Telegram bot I've built. Enjoy and feel free to reuse!

# Installation

## Local launch

1. Clone this repo: `git clone https://github.com/acionyx/shieldy`
2. Launch the [mongo database](https://www.mongodb.com/) locally
3. Create `.env` with the environment variables listed below
4. Run `yarn install` in the root folder
5. Run `yarn distribute`

And you should be good to go! Feel free to fork and submit pull requests. Thanks!

## Docker

1. Clone this repo: `git clone https://github.com/acionyx/shieldy`
2. Replace the dummy environment variables in `docker-compose.yml` with the ones listed below
3. Run `docker-compose up -d`

## Environment variables

- `TOKEN` — Telegram bot token
- `MONGO`— URL of the mongo database
- `ADMIN` — Telegram user ID of the bot administrator
- `REPORT_CHAT_ID` — Telegram chat ID of the channel where the bot should report errors
- `PREMIUM` — Whether the bot should be premium or not
- `STRIPE_SECRET_KEY` — Stripe secret key
- `STRIPE_SIGNING_SECRET` — Stripe signing secret
- `MONTHLY_PRICE` — Monthly Stripe price id of the premium
- `YEARLY_PRICE` — Yearly Stripe price id of the premium
- `LIFETIME_PRICE` — Lifetime Stripe price id of the premium

Also, please, consider looking at `.env.sample`.

# Continuous integration

Any commit pushed to master gets deployed to @shieldy_bot via [CI Ninja](https://github.com/acionyx/ci-ninja).

# License

MIT — use for any purpose. Would be great if you could leave a note about the original developers. Thanks!
