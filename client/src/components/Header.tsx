import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19.79 14.93a8 8 0 0 0-1-9.25 8 8 0 0 0-12.58 0 8 8 0 0 0-1 9.25l6.29 10.32 6.29-10.32Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <h1 className="text-lg sm:text-xl font-bold text-secondary">Warmtestoring.nl</h1>
          </div>
          <div className="hidden sm:flex space-x-4">
            <HelpDialog />
            <ContactDialog />
          </div>
        </div>
      </div>
    </header>
  );
}

function HelpDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-sm text-muted-foreground hover:text-primary transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <path d="M12 17h.01" />
          </svg>
          <span>Help</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Hoe gebruikt u deze app?</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <p className="text-sm text-muted-foreground">
            Deze app helpt u bij het identificeren en oplossen van verwarmingsstoringen. Volg deze stappen:
          </p>
          <ol className="list-decimal list-inside text-sm space-y-2">
            <li>Voer uw foutcode in (bijv. F1, E01) of een beschrijving van het probleem</li>
            <li>Klik op een zoekresultaat om meer details te zien</li>
            <li>Volg de aanbevolen stappen om het probleem op te lossen</li>
            <li>Indien nodig, gebruik de 'Voor monteurs' tab voor meer technische informatie</li>
          </ol>
          <p className="text-sm text-muted-foreground mt-4">
            Bij ernstige problemen raden wij aan om contact op te nemen met een erkend installateur.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ContactDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-sm text-muted-foreground hover:text-primary transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          <span>Contact</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Contact Informatie</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <p className="text-sm text-muted-foreground">
            Voor ondersteuning of vragen over deze applicatie:
          </p>
          <div className="space-y-2">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span className="text-sm">+31 (0)20 123 4567</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span className="text-sm">support@warmtestoringen.nl</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Voor spoedeisende verwarmingsproblemen raden wij aan om direct contact op te nemen met een erkend installateur.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
