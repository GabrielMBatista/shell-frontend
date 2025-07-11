'use client';
import Header from '../common/header';
import Link from 'next/link';
import { useResolution } from '@/providers/ResolutionProvider';
import ResolutionSelector from '../ResolutionSelector';

export default function HomePage() {
  const { resolution } = useResolution();
  console.log('resolution', resolution);
  return (
    <div>
      <Header />
      <ui-hero
        heroTitle="Transformo complexidade em soluções claras."
        subtitle="Sou Gabriel Marques, desenvolvedor Front-End. Autodidata por essência, pensamento crítico como ferramenta principal."
      >
        <div slot="actions" className="flex gap-4">
          <a href="/projects">
            <ui-button>Ver Projetos</ui-button>
          </a>
          <a href="/about">
            <ui-button variant="ghost">Sobre Mim</ui-button>
          </a>
        </div>
      </ui-hero>
      <ui-section section-title="Quem sou eu">
        <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300 max-w-3xl">
          Diagnóstico de TDAH me fez entender minha principal força: aprender por conta própria.
          Isso me levou a desenvolver uma abordagem sistemática para resolver problemas com precisão
          e lógica. Hoje, uso essa capacidade para criar interfaces funcionais, acessíveis e que
          realmente fazem diferença.
        </p>
      </ui-section>

      <ui-section section-title="Minhas Tecnologias">
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 'var(--space-md)',
            marginTop: 'var(--space-md)',
          }}
        >
          {['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js'].map((tech) => (
            <div key={tech}>
              <ui-button variant="ghost">{tech}</ui-button>
            </div>
          ))}
        </div>
      </ui-section>
      <ui-section section-title="Projetos em Destaque">
        <a slot="action" href="/projects">
          <ui-button>Ver todos</ui-button>
        </a>
        <ResolutionSelector />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'var(--space-lg)',
          }}
        >
          <ui-project-card
            projectTitle="Alphabet Recorder"
            description="Gravador de áudio para treinar fonemas do alfabeto, com interface simples e prática."
            techs={['Next.js', 'Web Audio API']}
          >
            <iframe
              slot="thumb"
              src="https://alphabet-recorder.vercel.app"
              style={{ width: '100%', height: '200px', border: 'none', pointerEvents: 'none' }}
            />
            <div
              slot="preview"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                padding: '1rem',
                overflow: 'auto',
              }}
            >
              <div
                style={{
                  width: resolution.width,
                  height: resolution.height,
                  border: '1px solid #ccc',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  transform: `scale(${resolution.scale ?? 1})`,
                  transformOrigin: 'top center',
                }}
              >
                <iframe
                  src="https://alphabet-recorder.vercel.app"
                  allow="microphone"
                  style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                  }}
                />
              </div>
            </div>
          </ui-project-card>

          <ui-project-card
            projectTitle="Tropa Login"
            description="Teste técnico para uma vaga do LinkedIn com o intuito de desenvolver uma tela de login funcional."
            techs={['Next.js', 'Web Audio API']}
          >
            <iframe
              slot="thumb"
              src="https://tropa-login.vercel.app"
              style={{ width: '100%', height: '200px', border: 'none', pointerEvents: 'none' }}
            />
            <div
              slot="preview"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                padding: '1rem',
                overflow: 'auto',
              }}
            >
              <div
                style={{
                  width: resolution.width,
                  height: resolution.height,
                  border: '1px solid #ccc',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  transform: `scale(${resolution.scale ?? 1})`,
                  transformOrigin: 'top center',
                }}
              >
                <iframe
                  src="https://tropa-login.vercel.app"
                  allow="microphone"
                  style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                  }}
                />
              </div>
            </div>
          </ui-project-card>
          <ui-project-card
            projectTitle="Alphabet Recorder"
            description="Gravador de áudio para treinar fonemas do alfabeto, com interface simples e prática."
            techs={['Next.js', 'Web Audio API']}
          >
            <iframe
              slot="thumb"
              src="https://alphabet-recorder.vercel.app"
              style={{ width: '100%', height: '200px', border: 'none', pointerEvents: 'none' }}
            />
            <div
              slot="preview"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                padding: '1rem',
                overflow: 'auto',
              }}
            >
              <div
                style={{
                  width: resolution.width,
                  height: resolution.height,
                  border: '1px solid #ccc',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  transform: `scale(${resolution.scale ?? 1})`,
                  transformOrigin: 'top center',
                }}
              >
                <iframe
                  src="https://alphabet-recorder.vercel.app"
                  allow="microphone"
                  style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                  }}
                />
              </div>
            </div>
          </ui-project-card>

          <ui-project-card
            projectTitle="Alphabet Recorder"
            description="Gravador de áudio para treinar fonemas do alfabeto, com interface simples e prática."
            techs={['Next.js', 'Web Audio API']}
          >
            <iframe
              slot="thumb"
              src="https://alphabet-recorder.vercel.app"
              style={{ width: '100%', height: '200px', border: 'none', pointerEvents: 'none' }}
            />
            <div
              slot="preview"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                padding: '1rem',
                overflow: 'auto',
              }}
            >
              <div
                style={{
                  width: resolution.width,
                  height: resolution.height,
                  border: '1px solid #ccc',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  transform: `scale(${resolution.scale ?? 1})`,
                  transformOrigin: 'top center',
                }}
              >
                <iframe
                  src="https://alphabet-recorder.vercel.app"
                  allow="microphone"
                  style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                  }}
                />
              </div>
            </div>
          </ui-project-card>
        </div>
      </ui-section>
      <ui-section>
        <div className="flex flex-col items-center text-center gap-4">
          <h2 className="text-2xl font-semibold">Vamos conversar?</h2>
          <p className="max-w-xl text-gray-600 dark:text-gray-300">
            Se quiser saber mais sobre meus projetos ou bater um papo sobre tecnologia, estou
            disponível!
          </p>
          <div className="flex gap-4">
            <Link href="/contact">
              <ui-button>Fale comigo</ui-button>
            </Link>
            <Link href="/Gabriel_Marques_CV.pdf" passHref>
              <ui-button variant="ghost">Baixar Currículo</ui-button>
            </Link>
          </div>
        </div>
      </ui-section>
    </div>
  );
}
