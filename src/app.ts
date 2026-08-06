import express from 'express';
import nunjucks from 'nunjucks';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import publicRoutes from './routes/public/index.route.ts';
import { connectDB } from './db/database.ts';
import cors from "cors";

const app = express();

// @ts-ignore
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const viewsDir = path.join(projectRoot, 'src', 'views');
const assetsDir = path.join(projectRoot, 'public', 'assets');
const cssDir = path.join(projectRoot, 'src', 'css');
const picoDir = path.join(projectRoot, 'node_modules', '@picocss', 'pico', 'css');


app.set('views', viewsDir);
app.set('view engine', 'njk');


const env = nunjucks.configure(viewsDir, {
  autoescape: true,
  express: app,
  watch: true,
});

env.addGlobal('currentYear', () => new Date().getFullYear());

app.use('/assets', express.static(assetsDir));
app.use('/css', express.static(picoDir));
app.use('/css', express.static(cssDir));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(publicRoutes);

const port = Number(process.env['PORT']) || 3000;

async function init () {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
};

init();
