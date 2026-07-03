// "use client";

// import { useActionState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { submitContact } from "@/server/contact/actions";
// import { initialContactState } from "@/server/contact/types";
// import { CheckCircle, AlertCircle, Send, Sparkles } from "lucide-react";

// export default function ContactForm({ source }: { source?: string }) {
//   const [state, formAction, pending] = useActionState(
//     submitContact,
//     initialContactState
//   );

//   return (
//     <div className="border border-slate-200/80 bg-white/60 backdrop-blur-md rounded-[2.5rem] p-8 md:p-12 shadow-md relative overflow-hidden h-full">
//       {/* Soft gradient backgrounds in form card */}
//       <div className="absolute top-[-80px] right-[-80px] w-64 h-64 rounded-full bg-gradient-to-br from-primary/5 to-accent/5 blur-3xl pointer-events-none" />
      
//       <AnimatePresence mode="wait">
//         {state.ok ? (
//           <motion.div
//             key="success"
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.95 }}
//             transition={{ duration: 0.4 }}
//             className="flex flex-col items-center justify-center text-center py-16 px-4"
//           >
//             <div className="size-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mb-6 shadow-sm">
//               <CheckCircle className="size-8" />
//             </div>
//             <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-slate-900 mb-3">
//               Message Received
//             </h3>
//             <p className="text-sm text-slate-500 font-light leading-relaxed max-w-sm">
//               {state.message || "Thank you for reaching out! Our team will review your project details and get back to you shortly."}
//             </p>
//           </motion.div>
//         ) : (
//           <motion.form
//             key="form"
//             action={formAction}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="space-y-6 relative z-10"
//           >
//             {source ? <input type="hidden" name="source" value={source} /> : null}

//             <div className="border-b border-slate-100 pb-4 mb-2">
//               <h3 className="text-lg font-black uppercase tracking-wide text-slate-900 flex items-center gap-2">
//                 <Sparkles size={16} className="text-indigo-500" /> Send a Message
//               </h3>
//               <p className="text-xs text-slate-400 font-light mt-1">
//                 Fill in the details below and we will get back to you with a detailed scope report.
//               </p>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//               <Field 
//                 label="Name" 
//                 name="name" 
//                 placeholder="John Doe"
//                 errors={state.errors?.name} 
//                 required 
//               />
//               <Field 
//                 label="Email Address" 
//                 name="email" 
//                 type="email" 
//                 placeholder="john@company.com"
//                 errors={state.errors?.email} 
//                 required 
//               />
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//               <Field 
//                 label="Phone Number" 
//                 name="phone" 
//                 placeholder="+1 (555) 000-0000"
//                 errors={state.errors?.phone} 
//               />
//               <Field 
//                 label="Company Name" 
//                 name="company" 
//                 placeholder="Acme Corp"
//                 errors={state.errors?.company} 
//               />
//             </div>

//             <div>
//               <label htmlFor="message" className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">
//                 Message <span className="text-red-500">*</span>
//               </label>
//               <textarea
//                 id="message"
//                 name="message"
//                 rows={5}
//                 required
//                 placeholder="Tell us about your project, timeline, budget, or key requirements..."
//                 className={`w-full rounded-2xl border bg-white/50 px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400/80 transition-all duration-300 ${
//                   state.errors?.message
//                     ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
//                     : "border-slate-200/80 focus:border-primary focus:ring-4 focus:ring-primary/10"
//                 }`}
//               />
//               <FieldError errors={state.errors?.message} />
//             </div>

//             {state.message && !state.ok ? (
//               <div className="flex items-center gap-2.5 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
//                 <AlertCircle className="size-4 shrink-0" />
//                 <span>{state.message}</span>
//               </div>
//             ) : null}

//             <button
//               type="submit"
//               disabled={pending}
//               className="w-full inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-900/60 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:-translate-y-0.5 disabled:transform-none disabled:cursor-not-allowed transition-all duration-300 cursor-pointer"
//             >
//               {pending ? (
//                 <>
//                   <div className="size-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
//                   <span>Sending Message...</span>
//                 </>
//               ) : (
//                 <>
//                   <span>Send Message</span>
//                   <Send size={13} />
//                 </>
//               )}
//             </button>
//           </motion.form>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// function Field({
//   label,
//   name,
//   type = "text",
//   required,
//   placeholder,
//   errors,
// }: {
//   label: string;
//   name: string;
//   type?: string;
//   required?: boolean;
//   placeholder?: string;
//   errors?: string[];
// }) {
//   return (
//     <div className="text-left">
//       <label htmlFor={name} className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">
//         {label} {required ? <span className="text-red-500">*</span> : null}
//       </label>
//       <input
//         id={name}
//         name={name}
//         type={type}
//         required={required}
//         placeholder={placeholder}
//         className={`w-full rounded-full border bg-white/50 px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400/80 transition-all duration-300 ${
//           errors
//             ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
//             : "border-slate-200/80 focus:border-primary focus:ring-4 focus:ring-primary/10"
//         }`}
//       />
//       <FieldError errors={errors} />
//     </div>
//   );
// }

// function FieldError({ errors }: { errors?: string[] }) {
//   if (!errors?.length) return null;
//   return (
//     <div className="mt-1.5 flex items-center gap-1 text-[11px] text-red-500 font-medium">
//       <AlertCircle className="size-3.5 shrink-0" />
//       <span>{errors[0]}</span>
//     </div>
//   );
// }
