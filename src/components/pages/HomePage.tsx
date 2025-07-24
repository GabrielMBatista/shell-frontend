'use client';
import Header from '../common/header';
import Link from 'next/link';
import { useResolution } from '@/providers/ResolutionProvider';
import ResolutionSelector from '../ResolutionSelector';
import Image from 'next/image';
import ContactModal from '../common/ContactModal';
import { useRef } from 'react';
import gabrielPhoto from '@/assets/gabrielPhoto.jpg';

export default function HomePage() {
  const { resolution } = useResolution();
  const modalRef = useRef<HTMLUiModalElement>(null);

  const openModal = () => {
    modalRef.current?.openModal();
  };

  const closeModal = () => {
    modalRef.current?.close();
  };

  return (
    <div>
      <Header />
      <ui-section className="py-12 px-4 md:px-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-1 flex justify-center">
            <Image
              src={gabrielPhoto}
              alt="Gabriel Marques"
              width={426}
              height={484}
              className="rounded-xl shadow-lg max-w-full h-auto"
            />
          </div>
          <div className="md:col-span-2 space-y-6">
            <p className="text-gray-800 text-[1.125rem] leading-relaxed">
              Sempre fui movido pela curiosidade. Quando recebi o diagnóstico de TDAH, percebi que
              minha maior força era justamente a capacidade de aprender sozinho. Isso me ajudou a
              transformar o aprendizado em uma ferramenta estruturada, capaz de trazer clareza,
              lógica e criatividade para resolver qualquer desafio.
            </p>

            <p className="text-gray-800 text-[1.125rem] leading-relaxed">
              Trabalho com React, Next.js e Node.js há mais de quatro anos, desenvolvendo interfaces
              acessíveis, modernas e rápidas. Participei de projetos variados, com foco em
              usabilidade, boas práticas de código e colaboração com diferentes times. Também gosto
              de orientar pessoas que estão começando na área, compartilhando o que aprendi na
              prática.
            </p>

            <p className="text-gray-800 text-[1.125rem] leading-relaxed">
              Antes disso, atuei com suporte técnico, manutenção e infraestrutura, passando por
              empresas de diferentes portes e setores. Essa vivência reforçou minha empatia com o
              usuário, minha visão ampla sobre produto e minha capacidade de comunicação.
            </p>

            <div className="flex flex-wrap gap-3 mt-4">
              {['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js'].map((tech) => (
                <ui-button key={tech} variant="ghost">
                  {tech}
                </ui-button>
              ))}
            </div>
          </div>
        </div>
        <p className="mt-6 text-sm text-gray-500 italic text-center md:text-left">
          Gabriel Marques – Desenvolvedor JavaScript
        </p>
      </ui-section>
      <ui-section section-title="Projetos em Destaque">
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
            description="Teste tecnico Gravador de áudio para treinar fonemas do alfabeto, com interface simples e prática."
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
                  backgroundColor: 'var(--color-background, #fff)',
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
                  backgroundColor: 'var(--color-background, #fff)',
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
            projectTitle="Entrevista AI"
            description="Sistema basico que usa a api da openAPI para avaliar niveis tecnicos, agilizando o processo de triagem."
            techs={['Next.js', 'Web Audio API']}
          >
            <iframe
              slot="thumb"
              src="https://mfe-entrevista-lcek.vercel.app/home"
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
                  backgroundColor: 'var(--color-background, #fff)',
                }}
              >
                <iframe
                  src="https://mfe-entrevista-lcek.vercel.app/home"
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
          <p className="max-w-xl text-gray-700 dark:text-gray-900">
            Se quiser saber mais sobre meus projetos ou bater um papo sobre tecnologia, estou
            disponível!
          </p>
          <div className="flex gap-4">
            <ui-button variant="ghost" onClick={openModal}>
              Fale comigo
            </ui-button>
            <Link href="/Gabriel_Marques_CV.pdf" passHref>
              <ui-button variant="ghost">Baixar Currículo</ui-button>
            </Link>
          </div>
        </div>
      </ui-section>
      <ContactModal ref={modalRef} onClose={closeModal} />
    </div>
  );
}
