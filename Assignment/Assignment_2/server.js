
import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

const products = [];

for (let i = 1; i <= 100; i++) {
    products.push({
        id: i,
        name: `Product ${i}`,
        price: i * 100,
        category: i % 2 === 0 ? 'Electronics' : 'Clothing'
    });
}

app.get('/', (req, res) => {
    res.send('Product API is running');
});

app.get('/products', (req, res) => {
    res.json(products);
});

app.get('/products/:id', (req, res) => {
    const id = Number(req.params.id);
    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
});

app.post('/products', (req, res) => {
    const { name, price, category } = req.body;

    if (!name || price === undefined || !category) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const product = {
        id: products.length + 1,
        name,
        price,
        category
    };

    products.push(product);

    res.status(201).json(product);
});

app.put('/products/:id', (req, res) => {
    const id = Number(req.params.id);
    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    const { name, price, category } = req.body;

    if (!name || price === undefined || !category) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    product.name = name;
    product.price = price;
    product.category = category;

    res.json(product);
});

app.delete('/products/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ message: 'Product not found' });
    }

    products.splice(index, 1);

    res.json({ message: 'Product deleted' });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});