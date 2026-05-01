import { Mail, MessageSquare, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div>
          <h1 className="text-5xl font-black mb-6 tracking-tight">Get in Touch</h1>
          <p className="text-lg text-muted-foreground mb-12">
            Have a tool suggestion or found a bug? We'd love to hear from you. 
            Fill out the form and we'll get back to you as soon as possible.
          </p>

          <div className="space-y-8">
            <div className="flex items-start space-x-6">
              <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold">Email Us</h3>
                <p className="text-muted-foreground">nasifbd83@gmail.com</p>
              </div>
            </div>
            <div className="flex items-start space-x-6">
              <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <MessageSquare className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold">Live Support</h3>
                <p className="text-muted-foreground">Available Mon-Fri, 9am - 5pm</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-muted/30 p-8 md:p-12 rounded-[2.5rem] border shadow-2xl shadow-primary/5">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input placeholder="John Doe" className="h-12 rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label>Email Address</Label>
                <Input type="email" placeholder="john@example.com" className="h-12 rounded-xl" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Subject</Label>
              <Input placeholder="How can we help?" className="h-12 rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label>Message</Label>
              <textarea 
                className="w-full min-h-[150px] p-4 rounded-xl bg-background border focus-visible:ring-2 focus-visible:ring-primary outline-none"
                placeholder="Tell us more about your request..."
              />
            </div>
            <Button className="w-full h-14 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20">Send Message</Button>
          </form>
        </div>
      </div>
    </div>
  );
};
