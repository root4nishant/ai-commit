git clone https://github.com/root4nishant/ai-commit.git
cd ai-commit
cp config/config.example.sh config.sh
nano config.sh # add your API key, model, python path
chmod +x bin/commit.sh
./bin/commit.sh -- "fix #42"
