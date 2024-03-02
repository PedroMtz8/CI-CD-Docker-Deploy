import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import useHandleResize from '@/hooks/useHandleResize';
import { cn } from '@/lib/utils';

interface ModalProps {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  className?: string;
}

export function Modal({ title, description, isOpen, onClose, children, className }: ModalProps) {
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const breakpoint = useHandleResize({ maxWidth: 350 })

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent className={cn(
        breakpoint ? 'w-full' : 'w-[350px] sm:w-full',
        className
      )} >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
}