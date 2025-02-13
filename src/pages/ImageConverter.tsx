
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Upload, Download, Image as ImageIcon } from "lucide-react";

const ImageConverter = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [convertedImage, setConvertedImage] = useState<string | null>(null);
  const [format, setFormat] = useState<string>("png");
  const { toast } = useToast();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file",
          variant: "destructive",
        });
        return;
      }
      setSelectedFile(file);
      setConvertedImage(null);
    }
  };

  const convertImage = async () => {
    if (!selectedFile) return;

    try {
      const image = new Image();
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      await new Promise((resolve, reject) => {
        image.onload = resolve;
        image.onerror = reject;
        image.src = URL.createObjectURL(selectedFile);
      });

      canvas.width = image.width;
      canvas.height = image.height;
      ctx?.drawImage(image, 0, 0);

      const convertedDataUrl = canvas.toDataURL(`image/${format}`);
      setConvertedImage(convertedDataUrl);
      
      toast({
        title: "Success!",
        description: "Image converted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to convert image",
        variant: "destructive",
      });
    }
  };

  const downloadImage = () => {
    if (!convertedImage) return;

    const link = document.createElement("a");
    link.href = convertedImage;
    link.download = `converted-image.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen w-full py-12 relative">
      {/* Fancy Background */}
      <div 
        className="fixed inset-0 -z-10" 
        style={{
          background: "linear-gradient(102.3deg, rgba(147,39,143,1) 5.9%, rgba(234,172,232,1) 64%, rgba(246,219,245,1) 89%)",
          opacity: 0.9
        }}
      />
      
      {/* Content with glass effect */}
      <div className="container mx-auto px-4 relative z-10">
        <h1 className="text-4xl font-bold text-center mb-8 text-white drop-shadow-lg">
          Image Converter
        </h1>
        
        <Card className="max-w-2xl mx-auto p-6 glass backdrop-blur-md bg-white/30 border border-white/20">
          <div className="space-y-6">
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-white/30 rounded-lg p-8 bg-white/10">
              <ImageIcon className="w-12 h-12 text-white mb-4" />
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="max-w-xs bg-white/20 text-white placeholder-white/70"
              />
            </div>

            {selectedFile && (
              <div className="space-y-4">
                <div className="flex gap-4 items-center justify-center">
                  <select
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                    className="px-4 py-2 rounded-md bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                  >
                    <option value="png">PNG</option>
                    <option value="jpeg">JPEG</option>
                    <option value="webp">WEBP</option>
                  </select>
                  <Button 
                    onClick={convertImage}
                    className="bg-white/20 hover:bg-white/30 text-white border border-white/30"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Convert
                  </Button>
                </div>

                {convertedImage && (
                  <div className="flex flex-col items-center gap-4">
                    <img
                      src={convertedImage}
                      alt="Converted"
                      className="max-w-full h-auto rounded-lg shadow-xl"
                    />
                    <Button 
                      onClick={downloadImage}
                      className="bg-white/20 hover:bg-white/30 text-white border border-white/30"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ImageConverter;
