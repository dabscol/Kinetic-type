let mic;
let analyser;
let font; // Declarar la variable de la fuente
let minWeight = 100; // Peso mínimo de la fuente
let maxWeight = 900; // Peso máximo de la fuente
let audioStarted = false; // Bandera para verificar si se inició el audio

function preload() {
  // Cargar una fuente (reemplaza con la ruta de tu fuente)
  font = loadFont('Montserrat-Variable.ttf', () => console.log('Fuente cargada correctamente'), () => console.error('Error al cargar la fuente'));
}

function setup() {
  createCanvas(1520, 700);

  // Crear el objeto de micrófono y el analizador de FFT
  mic = new p5.AudioIn();
  mic.start();

  analyser = new p5.FFT();
  analyser.setInput(mic);

  // Establecer la fuente y propiedades del texto
  textFont(font);
  textSize(60);
  textAlign(CENTER, CENTER);
  fill(255);
}

function draw() {
  background(0);

  // Verificar si el audio no se ha iniciado y el contexto de audio está suspendido
  if (!audioStarted && getAudioContext().state !== 'running') {
    text("Haz click para iniciar el audio", width / 2, height / 2);
  } else {
    // Obtener el nivel de volumen del micrófono
    let vol = mic.getLevel();

    // Mapear el nivel de volumen al rango de pesos de la fuente
    let weightValue = map(vol, 0, 1, minWeight, maxWeight);

    // Personalizar el texto y la posición
    let textoPersonalizado = 'Texto dinámico';
    textFont(font, weightValue);
    text(textoPersonalizado, width / 2, height / 2);
  }
}

function mousePressed() {
  // Reanudar el contexto de audio al hacer clic
  if (!audioStarted) {
    getAudioContext().resume().then(() => {
      console.log('AudioContext reanudado');
      audioStarted = true;
    });
  }
}
