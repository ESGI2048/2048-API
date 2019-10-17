separator()
{
	echo "-------------------------"
}

prepare()
{
	cd /vagrant

	apt-get install software-properties-common
	apt-key adv --recv-keys --keyserver hkp://keyserver.ubuntu.com:80 0xF1656F24C74CD1D8

	curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
	apt-get update
}

install_dependencies()
{
	separator
	echo "Installing dependencies..."

	apt-get install -y postgresql
	apt-get install -y nodejs
	apt-get install -y git

	apt-get -y autoremove
	npm install
}

setup_database()
{
	separator
	echo "Setting up database..."
	sudo -u postgres psql -c "CREATE USER api WITH SUPERUSER CREATEDB PASSWORD 'secret';"
	sudo -u postgres psql -c "CREATE DATABASE api OWNER api;"
}

configure()
{
	separator
	echo "Configuring..."

	cat <<EOF > /vagrant/.env
PORT=
DB_USER=api
DB_PASSWORD=secret
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=api
MORGAN_LOG=logs/requestList.log
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin

EOF

	chmod 777 .env

	setup_database
}

install()
{
	install_dependencies
	configure
}

provision()
{
	echo "Starting provisionning..."
	prepare
	install

	separator

	echo "Provision completed"
}

provision
