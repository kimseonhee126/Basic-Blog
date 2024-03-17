const express = require('express');
const app = express();
const db = require('./models');
const { User } = db;
const { Post } = db;

app.use(express.json());

// '/' 라우터 처리
app.get('/', async (req, res) => {
    // 콘솔창에 메시지 띄우기
    console.log('/ 에 대한 GET 요청이 들어왔습니다.');
    // 웹브라우저 화면에 아래와 같은 문자열 띄우기
    res.send('GET / 요청을 받았습니다!');
});

// '/abc' 라우터 처리
app.get('/abc', async (req, res) => {
    // 콘솔창에 메시지 띄우기
    console.log('/abc 에 대한 GET 요청이 들어왔습니다.');
    // 웹브라우저 화면에 아래와 같은 문자열 띄우기
    res.send('GET /abc 요청을 받았습니다!');
});

// 사용자 CRUD
app.get('/user/all', async (req, res) => {
    const users = await User.findAll();
    res.json(users);
});

app.get('/user/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// user 추가하기
app.post('/user', async (req, res) => {
    //
    try {
        const newUser = req.body;
        const user = User.build(newUser);
        await user.save();

        res.send(newUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// user 수정하기
app.put('/user/:id', async (req, res) => {
    // 홍길동 age(나이) 수정하기
    try {
        //
        const { id } = req.params;
        const newInfo = req.body;

        const newUser = await User.findOne({ where: { id } });
        if (newUser) {
            Object.keys(newInfo).forEach((prop) => {
                newUser[prop] = newInfo[prop];
            });

            await newUser.save();
            res.send(newUser);
        }

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 사용자 삭제하기
app.delete('/user/:id', async (req, res) => {
    //
    try {
        const { id } = req.params;
        const deleteUser = await User.destroy({ where: { id } });

        if (deleteUser) {
            res.send({ message: `id: ${id} is deleted` });
        } else {
            res.status(404).json({ message: `There is no user with this ${id}` });
        }
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});

// 게시물 전체 조회 / 특정 조회
app.get('/post/all', async (req, res) => {
    try {
        const allPost = await Post.findAll();
        res.json(allPost);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/post/:id', async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        res.json(post);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.post('/post', async (req, res) => {
    // 만약 둘리가 작성했다면
    try {
        const user = await User.findOne({
            where: { name: '홍길동' },
        });

        const { title, content } = req.body;
        const newPost = await Post.create({
            title: title,
            content: content,
            writer: user.name,
            writerId: user.id,
        });
        res.status(201).json(newPost);
    } catch (err) {
        res.status(500).json({ error: err.error });
    }
});

// post 수정하기
app.put('/post/:id', async (req, res) => {
    // 1번 블로그 수정하기
    try {
        //
        const { id } = req.params;
        const newInfo = req.body;

        const newPost = await Post.findOne({ where: { id } });

        if (newPost) {
            Object.keys(newInfo).forEach((prop) => {
                newPost[prop] = newInfo[prop];
            });

            await newPost.save();
            res.send(newPost);
        }
    } catch (err) {
        res.status(500).json({ error: err.error });
    }
});

// Running Server
app.listen(3001, (req, res) => {
    console.log('Server is running on 3001');
});