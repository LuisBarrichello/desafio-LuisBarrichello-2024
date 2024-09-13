class RecintosZoo {
    constructor() {
        this.recintos = [
            {
                numero: 1,
                bioma: 'savana',
                tamanho: 10,
                animais: [{ especie: 'MACACO', quantidade: 3 }],
            },
            { numero: 2, bioma: 'floresta', tamanho: 5, animais: [] },
            {
                numero: 3,
                bioma: 'savana e rio',
                tamanho: 7,
                animais: [{ especie: 'GAZELA', quantidade: 1 }],
            },
            { numero: 4, bioma: 'rio', tamanho: 8, animais: [] },
            {
                numero: 5,
                bioma: 'savana',
                tamanho: 9,
                animais: [{ especie: 'LEAO', quantidade: 1 }],
            },
        ];

        this.animais = {
            LEAO: {
                tamanho: 3,
                bioma: ['savana'],
                carnivoro: true,
            },
            LEOPARDO: {
                tamanho: 2,
                bioma: ['savana'],
                carnivoro: true,
            },
            CROCODILO: {
                tamanho: 3,
                bioma: ['rio'],
                carnivoro: true,
            },
            MACACO: {
                tamanho: 1,
                bioma: ['savana', 'floresta'],
                carnivoro: false,
            },
            GAZELA: {
                tamanho: 2,
                bioma: ['savana'],
                carnivoro: false,
            },
            HIPOPOTAMO: {
                tamanho: 4,
                bioma: ['savana', 'rio'],
                carnivoro: false,
            },
        };
    }

    analisaRecintos(animal, quantidade) {
        if (!this.animais[animal]) {
            return { erro: 'Animal inválido' };
        }
        if (quantidade <= 0) {
            return { erro: 'Quantidade inválida' };
        }

        const animalData = this.animais[animal];
        const totalTamanho = animalData.tamanho * quantidade;

        const recintosViaveis = this.recintos
            .filter((recinto) => {
                const espacoOcupado = recinto.animais.reduce((total, a) => {
                    return (
                        total + this.animais[a.especie].tamanho * a.quantidade
                    );
                }, 0);
                const espacoRestante = recinto.tamanho - espacoOcupado;

                const biomaCompativel = animalData.bioma.some((bioma) =>
                    recinto.bioma.includes(bioma),
                );
                
                const convivioCarnivoros =
                    !animalData.carnivoro ||
                    recinto.animais.length === 0 ||
                    recinto.animais.every((a) => a.especie === animal);
                
                
                
                const espacoSuficiente = espacoRestante >= totalTamanho;

                return (
                    biomaCompativel && convivioCarnivoros && espacoSuficiente
                );
            })
            .map((recinto) => {
                const espacoOcupado = recinto.animais.reduce((total, a) => {
                    return (
                        total + this.animais[a.especie].tamanho * a.quantidade
                    );
                }, 0);

                const espacoExtra =
                    recinto.animais.length > 0 &&
                    recinto.animais.some((a) => a.especie !== animal)
                        ? 1
                        : 0;

                const espacoRestante =
                    recinto.tamanho - espacoOcupado - totalTamanho - espacoExtra;

                return `Recinto ${recinto.numero} (espaço livre: ${espacoRestante} total: ${recinto.tamanho})`;
            });

        if (recintosViaveis.length === 0) {
            return { erro: 'Não há recinto viável' };
        }

        return { recintosViaveis };
    }
}

export { RecintosZoo as RecintosZoo };