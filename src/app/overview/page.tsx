
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function OverviewPage() {
  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-3xl text-primary">
            The Mahabharata: An Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-lg leading-relaxed">
          <Image 
            src="https://placehold.co/800x400.png" 
            alt="Depiction of Kurukshetra battlefield" 
            width={800} 
            height={400} 
            className="rounded-md shadow-md mx-auto"
            data-ai-hint="battlefield war"
          />
          <p>
            The Bhagavad Gita, often referred to as the Gita, is a 700-verse Hindu scripture that is part of the Indian epic Mahabharata.
            It is set in a narrative framework of a dialogue between Pandava prince Arjuna and his guide and charioteer Krishna, an avatar of Lord Vishnu.
          </p>
          <p className="font-semibold text-accent">
            Note: This page content currently focuses on the Bhagavad Gita. It should be updated to provide a comprehensive overview of the entire Mahabharata epic.
          </p>
          <h2 className="font-headline text-2xl text-accent mt-6">Context and Setting (of the Bhagavad Gita)</h2>
          <p>
            The Gita is set on the battlefield of Kurukshetra, just before the start of a climactic war between two groups of cousins, the Pandavas and the Kauravas.
            Arjuna, a key warrior for the Pandavas, is overcome with moral dilemma and despair about the violence and death the war will cause, particularly to his own kin and revered teachers fighting on the opposing side.
          </p>
          <Image 
            src="https://placehold.co/600x350.png" 
            alt="Krishna instructing Arjuna" 
            width={600} 
            height={350} 
            className="rounded-md shadow-md mx-auto"
            data-ai-hint="teacher student"
          />
          <h2 className="font-headline text-2xl text-accent mt-6">Key Figures (in the Bhagavad Gita)</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Arjuna:</strong> One of the five Pandava princes, a skilled archer and warrior, representing the bewildered individual soul seeking wisdom.
            </li>
            <li>
              <strong>Krishna:</strong> Arjuna's charioteer and divine guide, an avatar of Lord Vishnu, who imparts the sacred teachings of the Gita. He represents the Supreme Being or Universal Consciousness.
            </li>
            <li>
              <strong>Sanjaya:</strong> Counselor to the blind King Dhritarashtra (father of the Kauravas), who is granted divine vision by the sage Vyasa to witness and narrate the events of the battlefield.
            </li>
            <li>
              <strong>Dhritarashtra:</strong> The blind king whose inquiries to Sanjaya form the opening of the Gita.
            </li>
          </ul>
          <h2 className="font-headline text-2xl text-accent mt-6">Core Teachings (of the Bhagavad Gita)</h2>
          <p>
            Facing this crisis, Arjuna seeks Krishna's counsel. The ensuing dialogue covers a broad range of spiritual and philosophical topics, including:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Dharma:</strong> One's righteous duty, moral order, and right conduct.</li>
            <li><strong>Karma Yoga:</strong> The path of selfless action, performing one's duties without attachment to the results.</li>
            <li><strong>Jnana Yoga:</strong> The path of knowledge and wisdom, understanding the true nature of reality and the self.</li>
            <li><strong>Bhakti Yoga:</strong> The path of devotion and loving surrender to God.</li>
            <li>The nature of the Atman (Self/Soul) and Brahman (Ultimate Reality).</li>
            <li>The concept of Moksha (liberation or enlightenment).</li>
          </ul>
          <p>
            The Gita's timeless wisdom offers guidance on living a purposeful life, overcoming challenges, and achieving spiritual understanding, making it one of the most important and influential spiritual texts in the world.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
