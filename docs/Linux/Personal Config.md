# root passwor

set root password

```shell
sudo passwd root
```

# user permission

set root permission to normal user (file. /etc/sudoers)

```shell
harvey  ALL=(ALL:ALL) NOPASSWD:ALL
```

use sudo command without password (file. /etc/sudoers)

```shell
root    ALL=(ALL:ALL) NOPASSWD:ALL
%admin  ALL=(ALL:ALL) NOPASSWD:ALL
%sudo   ALL=(ALL:ALL) NOPASSWD:ALL
```

# change debian mirror

check debian version

```shell
cat /etc/debian_version
```

change debian mirror (/etc/apt/sources.list)

```shell
sed -i "s@http://deb.debian.org@http://mirrors.aliyun.com@g" /etc/apt/sources.list
```

# hostname

```shell
sudo hostnamectl set-hostname ubuntu
```

# firewall

disable firewall

```shell
sudo ufw disable
```

# network

set network (file. /etc/netplan/00-installer-config.yaml)

```shell
network:
  ethernets:
    enp0s5:
      addresses:
      - 192.168.10.11/24
      nameservers:
        addresses:
        - 114.114.114.114
        search: []
      routes:
      - to: default
        via: 192.168.10.1
  version: 2
```

restart network

```shell
sudo netplan apply
```

# zsh

update apt

```shell
sudo apt update
```

install zsh

```shell
sudo apt install zsh
```

set zsh as default shell

```shell
sudo chsh -s /bin/zsh
```

# zshrc

set zshrc (file. ~/.zshrc)

```shell
source $HOME/.oh-my-zsh/oh-my-zsh.sh

plugins=(
    git
    zsh-autosuggestions
    zsh-syntax-highlighting
)

# Proxy
export http_proxy="http://172.20.10.2:7890"
export https_proxy="http://172.20.10.2:7890"
export all_proxy="socks5://172.20.10.2:7890"

# Alias
alias c="clear"
alias to="touch"
alias md="mkdir -p"
alias cp="cp -R"
alias o="open"
alias v="nvim"
alias u="echo $USER@$HOST"
```

# oh-my-zsh

install git

```shell
sudo apt install git
```

install oh-my-zsh

```shell
sh -c "$(curl -fsSL https://gitee.com/shmhlsy/oh-my-zsh-install.sh/raw/master/install.sh)"
```

install plugin

```shell
# zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

# zsh-syntax-highlighting
git clone https://gitee.com/Annihilater/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

set oh-my-zsh (file. ~/.oh-my-zsh/oh-my-zsh.sh)

```shell
DISABLE_AUTO_UPDATE="true"
ZSH_THEME="robbyrussell"
```

set auto-source (file. ~/.zprofile)

```shell
source ~/.zshrc
```

# basic denpendency

```shell
sudo apt install -y build-essential libpcre3 libpcre3-dev zlib1g zlib1g-dev libssl-dev libgd-dev libxml2 libxml2-dev uuid-dev libgeoip-dev net-tools ninja-build gettext cmake zip unzip curl g++ vsftpd openssh-server sudo
```

# neovim

download neovim

```shell
git clone https://github.com/neovim/neovim
```

checkout git branch

```shell
git checkout stable
```

set compile level

```shell
make CMAKE_BUILD_TYPE=Release
```

compile neovim

```shell
sudo make install
```

copy config folder to Ubuntu

```shell
git clone https://github.com/HarveySuen0803/nvim-config.git ~/.config/nvim
```

# SSH

check SSH 

```shell
sudsudo service ssh restart
```

install SSH

```shell
sudo apt install openssh-server
```

configure root permission (file: /etc/ssh/sshd_config)

```shell
PermitRootLogin yes
```

restart SSH server

```shell
sudo systemctl enable ssh && sudo systemctl start ssh
```

# jdk

download JDK

```shell
curl -LJO https://download.oracle.com/java/17/latest/jdk-17_linux-aarch64_bin.tar.gz
curl -LJO https://download.oracle.com/graalvm/17/latest/graalvm-jdk-17_linux-aarch64_bin.tar.gz
```

export path

```shell
export PATH=/usr/local/lib/jdk-17:$PATH
# export PATH=/usr/local/lib/graalvm-jdk-17:$PATH
```